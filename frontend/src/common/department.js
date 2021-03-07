import department from './department.json';

const departmentArray = department;
const departmentOptions = () => {
  return departmentArray.map((it, index) => <option key={index}>{it}</option>);
};

export { departmentArray, departmentOptions };
