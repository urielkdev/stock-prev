package stock.prev.user;

import java.sql.Date;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		List<User> users = new ArrayList<>();
		Date currentDate = new Date(System.currentTimeMillis());
		for (User user : userRepository.findAll()) {
			Integer age = Period.between(user.getBirthDate().toLocalDate(), currentDate.toLocalDate()).getYears();
			user.setAge(age);
			users.add(user);
		}
		return users;
	}

	public User getUser(String id) {
		User user = userRepository.findOne(id);
		Date currentDate = new Date(System.currentTimeMillis());
		Integer age = Period.between(user.getBirthDate().toLocalDate(), currentDate.toLocalDate()).getYears();
		user.setAge(age);
		return user;
	}

	public void addUser(User user) {
		userRepository.save(user);
	}

	public void updateUser(User user) {
		userRepository.save(user);
	}

	public void deleteUser(String id) {
		userRepository.delete(id);
	}
	
}
