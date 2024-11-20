package com.application.config;

import javax.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.application.filter.JwtFilter;
import com.application.service.AdminService;
import com.application.service.RegistrationService;

@SuppressWarnings("unused")
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private RegistrationService registrationService;

	@Autowired
	private AdminService adminService;

	@Autowired
	private JwtFilter jwtFilter;

	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(registrationService);
		auth.userDetailsService(adminService);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	protected void configure(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeRequests(requests -> requests.antMatchers("/authenticate").permitAll()
						.antMatchers("/admin/login", "/admin/register", "/user/login", "/user/register", "/logout")
						.permitAll().anyRequest().fullyAuthenticated())
				.exceptionHandling(
						handling -> handling.accessDeniedHandler((request, response, accessDeniedException) -> {
							AccessDeniedHandler defaultAccessDeniedHandler = new AccessDeniedHandlerImpl();
							defaultAccessDeniedHandler.handle(request, response, accessDeniedException);
						}))
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore((Filter) jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
