package com.application.service;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class CaptchaService {

	private static final String SECRET_KEY = "6LcEmpIqAAAAAI_-pwMitlM1MnUGeYHBKJYzx1p2";
	private static final String VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

	public boolean verifyCaptcha(String captchaToken) {
		RestTemplate restTemplate = new RestTemplate();

		MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
		requestBody.add("secret", SECRET_KEY);
		requestBody.add("response", captchaToken);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

		ResponseEntity<Map> responseEntity = restTemplate.exchange(VERIFY_URL, HttpMethod.POST, requestEntity,
				Map.class);

		Map<String, Object> response = responseEntity.getBody();
		System.out.println("Google reCAPTCHA Response: " + response);

		return response != null && Boolean.TRUE.equals(response.get("success"));
	}
}
