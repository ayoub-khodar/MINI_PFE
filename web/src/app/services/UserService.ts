import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../Util/constantes';
import {User} from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }
  findAllUsers() {

    return this.http.get(API_URL + '/user/find' );

  }
  addUser(user: User) {
    return this.http.post(API_URL + '/user/add', user);
  }
  updateuser(user: User) {
    return this.http.post(API_URL + '/user/update', user);
  }
  findUserSec() {
    return this.http.get(API_URL + '/user/findProfSect');
  }
  finbById(id:number)
  {
    return this.http.get(API_URL + '/user/find/'+ id);
  }
  logout(callback){
    return callback && callback();
  }
}
