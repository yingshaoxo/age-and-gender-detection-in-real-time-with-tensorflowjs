from keras.models import Sequential
from keras.layers import Dense
import numpy as np

model = Sequential()

model.add(Dense(units=12, input_dim=2, activation='relu'))
model.add(Dense(units=8, activation='relu'))
model.add(Dense(units=4, activation='relu'))
model.add(Dense(units=2, activation='relu'))
model.add(Dense(1, kernel_initializer='normal'))

model.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])

X = np.random.rand(100, 2) * 100
print(X)
Y = X.sum(axis=1)
print(Y)

model.fit(X, Y, epochs=100, batch_size=2)
model.save("keras_model.h5")

new_X = np.array([[5.0, 5.0]])
r = model.predict(new_X)
print(r)

