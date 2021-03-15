import subjectType from './subjectType.json';

const subjectTypeArray = subjectType;
const subjectTypeOptions = () => {
  return subjectTypeArray.map((it, index) => <option key={index}>{it}</option>);
};

export { subjectTypeArray, subjectTypeOptions };
