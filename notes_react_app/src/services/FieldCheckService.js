export default class FieldCheckService {
      static maxNicknameLength = 50;
      static minNicknameLength = 2;

      static maxEmailLength = 300;
      static minEmailLength = 2;

      static maxPasswordLength = 30;
      static minPasswordLength = 8;

      static checkNickname(nickname) {
            if (typeof (nickname) != 'string' || nickname.length > this.maxNicknameLength || nickname.length < this.minNicknameLength)
                  throw { errorText: `Введите никнейм длиной от ${this.minNicknameLength} до ${this.maxNicknameLength} символов` };
      }

      static checkEmail(email) {
            if (typeof (email) != 'string' || email.length > this.maxEmailLength || email.length < this.minEmailLength)
                  throw { errorText: `Введите email длиной от ${this.minEmailLength} до ${this.maxEmailLength} символов` };
      }

      static checkPassword(password) {
            if (typeof (password) != 'string' || password.length > this.maxPasswordLength || password.length < this.minPasswordLength)
                  throw { errorText: `Введите пароль длиной от ${this.minPasswordLength} до ${this.maxPasswordLength} символов` };
      }
}