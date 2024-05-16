from glob import glob
import os
import csv
import pandas as pd
import json

def get_user_dict():
    result = {}
    with open("./user_list.txt", "r") as f:
            for line in f:
                columns = line.strip().split()

                key = columns[0]
                value = columns[1]

                result[key] = value
    return result


def get_data(tag):
    path = f"./divide/data_{tag}.csv"
    df = pd.read_csv(path)
    data = json.loads(df.to_json(orient='records'))
    return data

def get_df(tag):
    path = f"./divide/data_{tag}.csv"
    df = pd.read_csv(path)
    df = df.rename(columns={"memberId" : "userID", "problemId":"itemID"})
    # print(df)
    df["rating"] = 5
    return df

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 데이터베이스 연결 설정
def get_session():
    engine = create_engine('mysql+pymysql://b203:b203203!@k10b203.p.ssafy.io:3306/algonote')
    Session = sessionmaker(bind=engine)
    session = Session()
    return session