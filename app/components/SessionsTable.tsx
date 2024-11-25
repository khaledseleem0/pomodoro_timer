interface DataProps {
  data: {
    createdAt: string;
    duration: number;
    breakDuration: number;
  };
  index: number;
}
export const SessionsTable: React.FC<DataProps> = ({ data, index }) => {
  const { createdAt, duration, breakDuration } = data;
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{new Date(createdAt).toLocaleString()}</td>
        <td>{Math.floor(duration / 60)} Minutes</td>
        <td>{Math.floor(breakDuration / 60)} Minutes</td>
      </tr>
    </>
  );
};
