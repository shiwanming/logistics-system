package com.logistics.controller;

import com.logistics.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@ControllerAdvice
public class UserController extends ReturnType{

    @Autowired
    private UserService userService;

    @GetMapping(value = "/login",produces = "application/json")
    public Map<?,?> login(String loginId,String password){
        Map<?,?> result = userService.userLogin(loginId,password);
        return result;
    }

    @RequestMapping(value = "/change", method = RequestMethod.PUT)
    public String change(String loginId, String oldPassword, String newPassword) {

        System.out.println(loginId + " " + oldPassword + " " + newPassword);
        return userService.changePassword(loginId, oldPassword, newPassword);
    }
}
