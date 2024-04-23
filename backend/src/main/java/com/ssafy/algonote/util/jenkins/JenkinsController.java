package com.ssafy.algonote.util.jenkins;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class JenkinsController {
    @GetMapping("/test")
    public String test() {
        return "Hello Jenkins!";
    }
}
