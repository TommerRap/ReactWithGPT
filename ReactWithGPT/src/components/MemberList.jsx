const MemberList = ({ loading, error, responseData }) => {
  return (
    <>
      {!loading && !error && (
        <ul>
          {responseData.map((m) => (
            <li key={m.id}>
              {m.firstName} {m.lastName} - {m.phoneNumber}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default MemberList;