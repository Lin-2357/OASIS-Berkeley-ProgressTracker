import pandas as pd

df = pd.read_csv('./src/NewRaw.csv')
print(df)
df.to_json('./src/NewRaw.json', orient="records")