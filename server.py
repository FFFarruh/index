from xmlrpc.client import TRANSPORT_ERROR
from repositories import create_user_db, get_user_db, insert_user_db

import asyncio
import json
import websockets
import hashlib


client_serv = {}

async def echo(websocket):
    global client_serv

    async for json_message in websocket:
        message = json.loads(json_message)
        print(message)
        
        if message['btn'] == "Registration":
            password = hashlib.sha256(message['password'].encode()).hexdigest()

            message['password'] = password
            print(message)
            await insert_user_db(message)

        elif message['btn'] == "Autorization":
            user = await get_user_db(message)
            if user is None:
                print("This user does not exist")
                # return
            client_serv[user['user_id']] = websocket #TODO Сделать по ID вместо логина, 
            password = hashlib.sha256(message['password'].encode()).hexdigest()
            if user['password'] == password:
                print("TRUE")
                json_user = json.dumps(user)
                await websocket.send(json_user)
            else:
                print("You entered a wrong password")
            # return False

        elif message['btn'] == "Submit": 
            json_message = json.dumps(message['message'])
            await websocket.send(json_message)
            # websockets.broadcast(client_serv, json_message)
        # await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        print("Start server")
        await create_user_db()
        await asyncio.Future()  # run forever

asyncio.run(main())
