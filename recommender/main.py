import uvicorn
from fastapi import FastAPI, UploadFile, Request, status, File, HTTPException
from fastapi.responses import JSONResponse, FileResponse
import os
import uuid
from pathlib import Path
import sys
import platform
import json
from starlette.middleware.cors import CORSMiddleware

from dto.request.RecommendReqDto import RecommendReqDto
from dto.response.RecommendResDto import RecommendResDto


from util.utils import get_user_dict
from model.model import inference
import pandas as pd


app = FastAPI()

origins = [
    "https://k10b203.p.ssafy.io",
    "http://localhost:8000",
    "http://0.0.0.0:8000",
    "http://0.0.0.0",
]
user_dict = get_user_dict()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/python/recommend")
async def recommend(recommendDto : RecommendReqDto):

    # print(user_dict)
    try:
        nickname = recommendDto.nickname
        tag = recommendDto.tag
        solvedProblemIds = recommendDto.solvedProblemIds

        validation = []
        for problemId in solvedProblemIds:
            validation.append([0, problemId, 5])
        validation = pd.DataFrame(validation, columns=["userID", "itemID", "rating"]) 

        recommended_problems = inference(validation, tag)
        recommendResDto = RecommendResDto(count=len(recommended_problems), 
                                          recommendedProblemIds=recommended_problems)

        return  recommendResDto
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)