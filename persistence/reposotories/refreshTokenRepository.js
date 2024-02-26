import { query } from '../db.js';
import { RefreshToken } from '../../models/RefreshToken.js';
import config from 'config';
import { AlreadyExistsError, NotFoundError,  UnknownDatabaseError } from '../../errors/CustomErrors.js';
import { v4 } from 'uuid';

class RefreshTokenRepository {
      lifetime;

      constructor(lifetime) {
            this.lifetime = lifetime;
      }

      async create(userId) {
            var token = v4();

            const paramQuery = {
                  rowMode: 'array',
                  text: 'INSERT INTO note_refresh_token(refresh_token_user_id, refresh_token_token, refresh_token_creation_time, refresh_token_expiration_time) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + $3) RETURNING *',
                  values: [userId, token, this.lifetime]
            };

            try {
                  const result = await query(paramQuery);
                  return new RefreshToken(result.rows[0][0], result.rows[0][1], result.rows[0][2], result.rows[0][3], result.rows[0][4]);
            }
            catch(error) {
                  if(error.code == '23505')
                        throw new AlreadyExistsError();
                  else
                        throw new UnknownDatabaseError();
            }
      }

      async read(userId, token) {
            const paramQuery = {
                  rowMode: 'array',
                  text: 'SELECT refresh_token_id, refresh_token_user_id, refresh_token_token, refresh_token_creation_time, refresh_token_expiration_time FROM note_refresh_token WHERE refresh_token_user_id = $1 AND refresh_token_token = $2',
                  values: [userId, token]
            };
            const result = await query(paramQuery);
            
            if(result.rowCount == 0)
                  throw new NotFoundError();        

            return new RefreshToken(result.rows[0][0], result.rows[0][1], result.rows[0][2], result.rows[0][3], result.rows[0][4]);
      }

      async delete(userId, token) {
            const paramQuery = {
                  text: 'DELETE FROM note_refresh_token WHERE refresh_token_user_id = $1 AND refresh_token_token = $2',
                  values: [userId, token]
            };
            const result = await query(paramQuery);

            if(result.rowCount == 0)
                  throw new NotFoundError();
      }
}

const refreshTokenRepository = new RefreshTokenRepository(config.get('refresh_token.lifetime'));
export default refreshTokenRepository;