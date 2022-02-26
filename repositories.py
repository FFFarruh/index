from settings import Settings
# import psycopg
import psycopg2 as psycopg


setting = Settings()


#TODO
async def create_user_db():
    
    with psycopg.connect(setting.db_url) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                    CREATE TABLE IF NOT EXISTS db_user (
                        user_id serial PRIMARY KEY,
                        login text UNIQUE, 
                        password text,
                        role boolean)
                """
            )
        conn.commit()


async def create_user_info_db():

    with psycopg.connect(setting.db_url) as conn:

        with conn.cursor() as cur:

            cur.execute(
                """
                    CREATE TABLE IF NOT EXISTS db_user (
                        user_id serial PRIMARY KEY,
                        nikname text,
                        avatar text)
                """
            )
        conn.commit()


async def insert_user_db(obj):
    with psycopg.connect(setting.db_url) as conn:

        with conn.cursor() as cur:
            
            cur.execute(
                """INSERT INTO db_user (
                        login,
                        password,
                        role)
                    VALUES (%s, %s, false)""",
                (obj['login'], 
                obj['password']
                ),
            )
        conn.commit()

async def get_user_db(obj):
    with psycopg.connect(setting.db_url) as conn:

        with conn.cursor() as cur:
            cur.execute(
                        """ SELECT user_id, login, password, role
                            FROM db_user
                            WHERE login = %s""",
                        (obj['login'],),
            )
            user_data = cur.fetchone()
            if user_data is None:
                return None
            else:
                user = {'user_id': user_data[0], 'login': user_data[1], 'password': user_data[2], 'role': user_data[3]}
                return user
            

#             #TODO
            # subscribtions_db = cur.fetchall()
            # subscriptions = []

            # for sub in subscribtions_db:
            #     subscriptions.append(
            #         DBSubscribtion(chat_id=sub[0], title=sub[1], is_deleted=sub[2])
            #     )
            # return subscriptions



                #         time time without time zone,
                #         date date,
                #         message_id bigint,
                #         message text,
                #         is_deleted boolean
                #         is_changed boolean)
                # """