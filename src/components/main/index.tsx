import React, { useState, useCallback, useEffect } from "react";
import {
    Typography,
    Modal,
    Form,
    Input,
    Spin,
    message,
    Popconfirm,
} from "antd";
import { Button, Todo } from "@components";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/reducers";
import { removeTodo, editTodo } from "@redux/actions";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Layout, Menu, Breadcrumb } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
const getTodos = () => {
    return fetch("https://6161545037492500176312c5.mockapi.io/todo")
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.log(error);
        });
};
const deleteTodo = (id) => {
    return fetch(`https://6161545037492500176312c5.mockapi.io/todo/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => data);
};
const editTodoApi = (todo) => {
    return fetch(
        `https://6161545037492500176312c5.mockapi.io/todo/${todo.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        },
    )
        .then((response) => response.json())
        .then((data) => data);
};
export const Main: React.FC = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const [collapsed, setCollapsed] = useState(false);
    const { Title } = Typography;
    const queryClient = useQueryClient();
    const router = useRouter();
    // const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [edit, setEdit] = useState("");
    // const todos = useSelector((data: RootState) => data.todo);
    const { data, isLoading, isError } = useQuery("listTodo", getTodos);
    console.log("aaaaaa", data);
    const deleteMutation = useMutation(deleteTodo);
    const editMutation = useMutation(editTodoApi);
    const handleDelete = (id: number) => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
                message.success("delete sucssess");
                queryClient.invalidateQueries("listTodo");
            },
        });
    };
    const handleEditTodo = (values: any) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                message.success("edit sucssess");
                setToggle(false);
                queryClient.invalidateQueries("listTodo");
            },
        });
    };

    const renderModal = useCallback(() => {
        return (
            <Modal
                title="Edit Todo"
                visible={toggle}
                onCancel={() => setToggle(false)}
                destroyOnClose={true}
                footer={""}
            >
                <Form
                    initialValues={{
                        id: edit.id,
                        name: edit.name,
                    }}
                    onFinish={handleEditTodo}
                    name="edit"
                >
                    <Form.Item
                        name="id"
                        initialValues={edit.id}
                        hidden
                    ></Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your todo!",
                            },
                        ]}
                        initialValues={edit.name}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Edit
                    </Button>
                </Form>
            </Modal>
        );
    }, [edit, toggle]);
    const listTodo = () => {
        return (
            <div
                style={{
                    backgroundColor: "#282c34",
                    color: "#fff",
                    textAlign: "center",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Title type="success" level={5}>
                    TODO LIST
                </Title>
                <Link href="/add-todo">
                    <Button>Add</Button>
                </Link>
                {isLoading && <Spin />}
                {isError && <p>Error</p>}
                {data &&
                    data.map((todo, index) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#565656",
                                    width: "500px",
                                    height: "auto",
                                    display: "flex",
                                    margin: "20px 0",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 15px",
                                    margin: "5px 0",
                                }}
                                key={index}
                            >
                                {todo.name}
                                <div
                                    style={{
                                        display: "flex",
                                        width: "40%",
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setEdit(todo);
                                            setToggle(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure？"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => handleDelete(todo.id)}
                                    >
                                        <Button type="primary" danger>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            router.push(`/todo/${todo.id}`);
                                        }}
                                    >
                                        Detail
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                {renderModal()}
            </div>
        );
    };
    const handleCollapse = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed]);
    return listTodo();
};
