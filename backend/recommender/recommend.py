import pandas as pd

from sklearn.preprocessing import LabelEncoder
from lightfm import LightFM
from lightfm.data import Dataset


df = pd.read_csv('solved_problem_history.csv')

# LabelEncoder 생성
member_encoder = LabelEncoder()
problem_encoder = LabelEncoder()

# 사용자 ID와 문제 ID를 숫자로 변환
df['member_id'] = member_encoder.fit_transform(df['member_id'])
df['problem_id'] = problem_encoder.fit_transform(df['problem_id'])



# Dataset 객체 생성
dataset = Dataset()


dataset.fit(df['member_id'].unique(), df['problem_id'].unique())

# 상호 작용 행렬 생성
(interactions, weights) = dataset.build_interactions(zip(df['member_id'], df['problem_id']))


from lightfm.cross_validation import random_train_test_split

train, test = random_train_test_split(interactions, test_percentage=0.1)
train, test = train.tocsr().tocoo(), test.tocsr().tocoo()


# 모델 생성
model = LightFM(loss='warp')

# 모델 학습

model.fit(interactions, epochs=30)
