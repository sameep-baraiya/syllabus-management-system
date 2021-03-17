import courseType from './courseType.json';

const courseTypeArray = courseType;
const courseTypeOptions = () => {
  return courseTypeArray.map((it, index) => <option key={index}>{it}</option>);
};

export { courseTypeArray, courseTypeOptions };
