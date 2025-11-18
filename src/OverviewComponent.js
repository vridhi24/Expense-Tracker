import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-family: "Montserrat", sans-serif;
  width: 100%;
`;

const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bolder;
  & span {
    background-color: ${(props) => (props.isAddvisible ? "red" : "#50c878")};
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bolder;
    font-size: 15px;
    color: black;
    width: 100%;
    text-align: center;
  }
`;

const AddTransaction = styled.div`
  color: white;
  background: black;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;

const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid whitesmoke;
  gap: 10px;
  padding: 15px 20px;
  width: 100%;
  margin: 10px 20px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 2px solid black;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 2px solid black;
  padding: 15px 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bolder;
    font-size: 24px;
  }
`;

const AddTransactionView = (props) => {
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();

  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransaction onClick={() => props.addTransaction({ id: Date.now(), amount: Number(amount), desc, type })}>
        Add Transaction
      </AddTransaction>
    </AddTransactionContainer>
  );
};

const OverviewComponent = (props) => {
  const [isAddvisible, toggleAdd] = useState(false);

  return (
    <Container>
      <BalanceBox isAddvisible={isAddvisible}>
        Balance: ₹ {props.income - props.expense}
        <AddTransaction onClick={() => toggleAdd((v) => !v)}>
          <span>{isAddvisible ? "Cancel" : "Add"}</span>
        </AddTransaction>
      </BalanceBox>
      {isAddvisible && <AddTransactionView addTransaction={(payload) => { props.addTransaction(payload); toggleAdd(false); }} />}
      <ExpenseContainer>
        <ExpenseBox>Expense<span>₹{props.expense}</span></ExpenseBox>
        <ExpenseBox isIncome={true}>Income<span>₹{props.income}</span></ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverviewComponent;
