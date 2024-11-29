package com.application.config;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.application.filter.JwtFilter;
import com.application.service.AdminService;
import com.application.service.RegistrationService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${frontend.url}")
	private String frontendUrl;

	@Autowired
	private RegistrationService userService;

	@Autowired
	private AdminService adminService;

	@Autowired
	private JwtFilter jwtFilter;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
		auth.userDetailsService(adminService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}

	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	protected void configure(HttpSecurity http) throws Exception {
		http.cors(corsConfig -> corsConfig.configurationSource(new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration corsConfiguration = new CorsConfiguration();
				corsConfiguration.setAllowedOrigins(List.of(frontendUrl));
				corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
				corsConfiguration.setAllowCredentials(true);
				corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
				corsConfiguration.setExposedHeaders(List.of("Authorization"));
				corsConfiguration.setMaxAge(3600L);
				return corsConfiguration;
			}
		})).csrf(csrf -> csrf.disable())
				.authorizeRequests(requests -> requests.antMatchers("/", "/authenticate").permitAll()
						.antMatchers("/admin/login", "/admin/register", "/user/login", "/user/register").permitAll()
						.anyRequest().fullyAuthenticated())
				.exceptionHandling(
						handling -> handling.accessDeniedHandler((request, response, accessDeniedException) -> {
							AccessDeniedHandler defaultAccessDeniedHandler = new AccessDeniedHandlerImpl();
							defaultAccessDeniedHandler.handle(request, response, accessDeniedException);
						}))
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
