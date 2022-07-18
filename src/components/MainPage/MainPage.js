import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css";

import DetailPage from "../DetailPage/DetailPage";

function MainPage() {
  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    key: "",
    name: "",
    waiting: 0,
    tags: [],
    date: "",
    description: "",
    id: 0,
  });

  const showModal = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("매칭 신청: ", { id: modalData.id });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 검색창 관리
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(0);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // 테이블 데이터
  const columns = [
    {
      title: "맛집",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "대기자 수",
      dataIndex: "waiting",
      key: "waiting",
      sorter: (a, b) => a.waiting - b.waiting,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "매칭 조건",
      key: "tags",
      dataIndex: "tags",

      filters: [
        {
          text: "성별",
          value: "성별",
          children: [
            {
              text: "여성",
              value: "여성",
            },
            {
              text: "남성",
              value: "남성",
            },
            {
              text: "성별 무관",
              value: "성별 무관",
            },
          ],
        },
        {
          text: "학과",
          value: "학과",
          children: [
            {
              text: "산업보안학과",
              value: "산업보안학과",
            },
            {
              text: "소프트웨어학과",
              value: "소프트웨어학과",
            },
          ],
        },
        {
          text: "만남 모드",
          value: "만남 모드",
          children: [
            {
              text: "밥만 먹어요",
              value: "밥만 먹어요",
            },
            {
              text: "우리 친해져요",
              value: "우리 친해져요",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tags.includes(value),

      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "magenta";

            if (tag === "여성") {
              color = "volcano";
            }
            if (tag === "남성") {
              color = "orange";
            }
            if (tag === "성별 무관") {
              color = "purple";
            }

            if (tag === "우리 친해져요") {
              color = "lime";
            }
            if (tag === "밥만 먹어요") {
              color = "cyan";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "매칭 신청",
      key: "action",
      render: (data) => (
        // <Space size="middle">
        // <Link to="/detail">신청하기😋</Link>
        // <Button type="primary" onClick={showModal}>
        //   신청하기😋
        // </Button>
        <Button onClick={() => showModal(data)}>신청하기😋</Button>
        // </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "우뇽파스타",
      waiting: 2,
      tags: ["여성", "산업보안학과", "우리 친해져요"],
      date: "2022-08-18 3:00pm",
      description: "여기 맛있어요!",
      id: 1,
    },
    {
      key: "2",
      name: "북촌순두부",
      waiting: 0,
      tags: ["남성", "경영학과", "밥만 먹어요"],
      date: "2022-08-18",
      description: "햄치즈 순두부 맛집",
      id: 2,
    },
    {
      key: "3",
      name: "카우버거",
      waiting: 1,
      tags: ["성별 무관", "소프트웨어학과", "우리 친해져요"],
      date: "2022-08-18",
      description: "친구를 사귀고 싶어요ㅠㅠ",
      id: 3,
    },
  ];

  return (
    <>
      {/* <div className={styles.title}>맛칭 리스트</div> */}
      <div className={styles.table_container}>
        <Table columns={columns} dataSource={data} className={styles.table} />
      </div>
      <Modal title="매칭 신청" cancelText="취소" okText="신청하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered="true" width="60%">
        {/* <DetailPage /> */}
        {/* <Link to={`/detail?account`}> t</Link> */}
        {/* {JSON.stringify(modalData)} */}
        <DetailPage data={modalData} />
      </Modal>
    </>
  );
}

export default MainPage;
