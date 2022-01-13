import React from "react";
import { Typography, Input, Button, Form, message } from "antd";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addTodo } from "@redux/actions";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
const addTodoApi = (todo) => {
    fetch("https://6161545037492500176312c5.mockapi.io/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    })
        .then((response) => response.json())
        .then((data) => data);
};
const AddTodo: React.FC = () => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation(addTodoApi);
    const onHandleFinish = (values: any) => {
        const { todo: todoName } = values;
        const todo = {
            name: todoName,
        };
        mutation.mutate(todo, {
            onSuccess: () => {
                message.success("add success");
                queryClient.invalidateQueries("listTodo");
                router.push("/");
            },
        });
        // dispatch(addTodo(todo));
    };
    return (
        <div
            style= {{
        backgroundColor: "#282c34",
            color: "#fff",
                textAlign: "center",
                    height: "100vh",
                        display: "flex",
                            justifyContent: "center",
                                alignItems: "center",
                                    flexDirection: "column",
            }
}
        >
    <Form onFinish={ onHandleFinish }>
        <Title type="success" > ADD TODO < /Title>
            < Form.Item
name = "todo"
rules = {
    [
        {
            required: true,
            message: "Please input your todo!",
        },
                    ]}
    >
    <Input
                        placeholder="Enter todo name"
style = {{
    width: "300px",
        borderRadius: "6px",
            padding: "8px",
                        }}
/>
    < /Form.Item>

    < Button
type = "primary"
htmlType = "submit"
style = {{
    margin: "0 10px",
                    }}
                >
    ADD
    < /Button>
    < Link href = "/" >
        <Button danger={ true }> Back < /Button>
            < /Link>
            < /Form>
            < /div>
    );
};

export default AddTodo;
