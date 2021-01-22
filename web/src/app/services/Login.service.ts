import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:9090/user/login';
  currentUser: BehaviorSubject<any>;


  constructor(private http: HttpClient) {
    this.currentUser = new BehaviorSubject(null);


  }

  login(userInfos) {
    return this.http.post(this.url, userInfos);
  }

  logout(callback){
    return callback && callback();
  }
}
