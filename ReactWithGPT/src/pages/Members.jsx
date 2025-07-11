import SearchInput from '../components/SearchInput';
import MemberList from '../components/MemberList';
const Members = (props) => {
  return (
    <>
      <p>Keyword length: {props.keywordLength}</p>
      <SearchInput {...props} />
      <MemberList loading={props.loading} 
                  error={props.error} 
                  responseData={props.responseData} />
    </>
  );
};
export default Members;