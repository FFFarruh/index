import asyncio
import websockets

client_serv = []

async def echo(websocket):
    global client_serv
    client_serv.append(websocket)
    async for message in websocket:
        
        websockets.broadcast(client_serv, message)
        print(message)
        # await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        print("Start server")
        await asyncio.Future()  # run forever

asyncio.run(main())
