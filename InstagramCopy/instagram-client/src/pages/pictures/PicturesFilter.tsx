import { Button, DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface Props {
  filter: string;
  setFilter: (newState: string) => void;
}

const PicturesFilter: React.FC<Props> = (props: Props) => {
  const { setFilter } = props;
  const { dynamicParam } = useParams();
  const [form] = Form.useForm();

  const formatTime = (time: string) => {
    console.log("time", time);
    const convertedTime = moment(time).format("YYYY-MM-DD[T]HH:mm:ss");
    console.log("convertedTime", convertedTime);
    return convertedTime;
  };

  const onFinish = (values: any) => {
    const queryParams = [];

    if (values.from) {
      queryParams.push(`from=${formatTime(values.from)}`);
    }

    if (values.to) {
      queryParams.push(`to=${formatTime(values.to)}`);
    }

    if (values.hashTags && values.hashTags.length > 0) {
      queryParams.push(
        `hashTags=${encodeURIComponent(values.hashTags.join(","))}`
      );
    }

    if (values.authorName) {
      queryParams.push(
        `authorName=${encodeURIComponent(values.authorName.trim())}`
      );
    }

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    setFilter(queryString);
  };

  useEffect(() => {
    form.setFieldValue("authorName", dynamicParam);
    form.submit();
  }, [dynamicParam]);

  return (
    <Form form={form} onFinish={onFinish} name="picture-filter" layout="inline">
      <Form.Item label="From" name="from" style={{ width: 190 }}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item label="To" name="to" style={{ width: 180 }}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      <Form.Item label="Tags" name="hashTags" style={{ width: 300 }}>
        <Select mode="tags" />
      </Form.Item>
      <Form.Item label="Author" name="authorName" style={{ width: 250 }}>
        <Input disabled={dynamicParam !== undefined} />
      </Form.Item>
      <Form.Item style={{ marginRight: 16 }}>
        <Button type="primary" ghost onClick={() => form.submit()}>
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PicturesFilter;
