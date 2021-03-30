const courseTypeOptions = (courseTypeArray) => {
  return courseTypeArray.map((it, index) => <option key={index}>{it}</option>);
};

const subjectTypeOptions = (subjectTypeArray) => {
  return subjectTypeArray.map((it, index) => <option key={index}>{it}</option>);
};

const departmentTypeOptions = (departmentTypeArray) => {
  return departmentTypeArray.map((it, index) => (
    <option key={index}>{it}</option>
  ));
};

export { courseTypeOptions, subjectTypeOptions, departmentTypeOptions };
