import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHttpContext } from "../../context/HttpContext";
import { InstagramLogDto } from "./InstagramLogDtos";

const InstagramLogScreen: React.FC = () => {
  const { get } = useHttpContext();
  const [instagramLogs, setInstagramLogs] = useState<InstagramLogDto[]>();

  const getInstagramLogs = async () => {
    const result = await get<InstagramLogDto[]>("/InstagramLog");
    if (result) {
      setInstagramLogs(result);
    }
  };

  useEffect(() => {
    getInstagramLogs();
  }, []);

  return (
    <>
      <Table
        rowKey={"id"}
        columns={[
          { dataIndex: "userName", title: "User name" },
          {
            dataIndex: "occurredAt",
            title: "Occurred at",
            render: (data: number | undefined) => {
              return <span>{moment(data).format("HH:mm:ss DD.MM.YY")}</span>;
            },
          },
          {
            dataIndex: "operation",
            title: "Operation",
          },
          { dataIndex: "requestQuery", title: "Request query" },
        ]}
        dataSource={instagramLogs}
      />
    </>
  );
};

export default InstagramLogScreen;
