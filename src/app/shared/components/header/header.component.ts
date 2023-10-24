// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/auth/services/auth/auth.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent implements OnInit {
//   isLogin: boolean = false;

//   constructor(private authService: AuthenticationService, private _Router: Router) {
//     authService.isLogin.next(true);
//   }

//   ngOnInit(): void {

//     this.authService.isLogin.subscribe((val) => {
//       if (localStorage.getItem("token")) {
//         this.isLogin = val;
//       }
//     })

//     // if (localStorage.getItem('token'))
//     //   this.isLogin = true;
//   }

//   logout() {
//     this.authService.logOut();
//     this._Router.navigate(["/login"])
//     localStorage.removeItem("token")
//   }


// }


import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  loginUserName: string = "";
  numOfCartItems: any = 0;

  constructor(private authService: AuthenticationService, private _Router: Router) {
    authService.isLogin.next(true);
  }

  ngOnInit(): void {
    this.authService.isLogin.subscribe((val) => {
      if (localStorage.getItem("token")) {
        val = true;
      } else {
        val = false;
      }
      this.isLogin = val;
    })
  }


  logout() {
    this.authService.logOut();
    this._Router.navigate(["/products"])
    localStorage.removeItem("token")
    this.authService.isLogin.next(false);
  }
}