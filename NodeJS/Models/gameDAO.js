import mongoose from 'mongoose';
import {gameModel} from '../utilities/MongooseModels';

export function createGame(game) {
  for (let i in game) {
    if (game.hasOwnProperty(i)) {
      if (game[i] === undefined)
        return Promise.reject('UserError: One or more fields are missing');
      else if (game[i] === '')
        return Promise.reject('UserError: Each field must have information');
    }
  }

  gameModel.create(game)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err);
    });
}

export function updateGameSettings(gameCode, game) {
  for (let i in game) {
    if (game.hasOwnProperty(i)) {
      if (game[i] === undefined)
        return Promise.reject('UserError: One or more fields are missing');
      else if (game[i] === '')
        return Promise.reject('UserError: Each field must have information');
    }
  }

  gameModel.findOneAndUpdate(
    {code: gameCode},
    {game_name: game.game_name,
    starting_amount: game.starting_amount,
    trade_limit: game.trade_limit,
    start_time: game.start_time,
    end_time: game.end_time},
    {new: true})
    .then((updatedGame) => {
      resolve(updatedGame);
    })
    .catch((err) => {
      reject(err);
    });
}

export function addUserToGame(uid, gameCode) {
  gameModel.findOneAndUpdate(
    {code: gameCode},
    {$push: {active_players: uid}},
    {new: true})
    .then((updatedGame) => {
      resolve(updatedGame);
    })
    .catch((err) => {
      reject(err);
    });
}

export function getGamesByUser(uid) {
  const findClause = {active_players: uid};
  return gameModel.find(findClause)
    .then((data) => {
      return Promise.resolve({games: data});
    })
    .catch((err) => {return Promise.reject(err)})
}

export function getGamesById(gameId) {
  const tickerList = mongoose.model('Ticker', tickerSchema);
  return tickerList.find({}, {tickers: 1, _id: 0}).catch((err) => {return Promise.reject(err)})
}