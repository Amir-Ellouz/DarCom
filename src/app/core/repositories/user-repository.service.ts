import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endpoints} from "../utils/constant";
import {SignUpDto} from "../../../../../bouhaha/src/app/core/models/dto/sign-up.dto";
import {SignInSuccessDto} from "../../../../../bouhaha/src/app/core/models/dto/sign-in-success-dto";
import {UpdateUserDto} from "../../../../../bouhaha/src/app/core/models/dto/update-user-dto";

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private httpClient : HttpClient) { }


  login(email:string,password : string){
    return this.httpClient.post<SignInSuccessDto>(
      Endpoints.login,
      {
        email : email,
        password : password
      }
    )
  }

  signUp(credentials : SignUpDto){
    return this.httpClient.post(
      Endpoints.signUp,
      credentials
    )
  }


  updateUserData(updateDto : UpdateUserDto){
    return this.httpClient.patch<void>(
      Endpoints.updateProfile,
      updateDto
    )
  }



}
