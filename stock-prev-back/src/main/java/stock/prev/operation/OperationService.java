package stock.prev.operation;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OperationService {
	
	@Autowired
	private OperationRepository operationRepository;

	public List<Operation> getAllOperationsByUser(String cpf) {
		List<Operation> operations = new ArrayList<>();
		operationRepository.findOperationsByUserCpf(cpf).forEach(operations::add);
		return operations;
	}

	public Operation getOperation(Integer id) {
		return operationRepository.findOne(id);
	}

	public void addOperation(Operation operation) {
		Date currentDate = new Date(System.currentTimeMillis());
		operation.setDate(currentDate);
		operationRepository.save(operation);
	}

	public void updateOperation(Operation operation) {
		operationRepository.save(operation);
	}

	public void deleteOperation(Integer id) {
		operationRepository.delete(id);
	}

	public String findNormalBalance(String cpf) {
		return String.format("%.2f", operationRepository.findNormalBalance(cpf));
	}

	public String findEventualBalance(String cpf) {
		return String.format("%.2f", operationRepository.findEventualBalance(cpf));
	}
	
}
