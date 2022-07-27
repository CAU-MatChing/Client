import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Radio, Tabs, Button } from "antd";
import styles from "./DetailPage.module.css";
import moment from "moment";
import "moment/locale/ko";

function DetailPage(props) {
  const data = props.data;
  const name = data.name;
  const waiting = data.waiting;
  // const tags = data.tags;
  // const date = data.date;
  // const description = data.description;
  // const max = data.max;
  // const id = data.id;
  const matchings = data.matchings;

  // 매칭 id 초기화
  useEffect(() => {
    props.setId(matchings[0].id);
  }, [matchings[0].id]);

  const { TabPane } = Tabs;

  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey="0"
        tabPosition="left"
        style={{
          height: 400,
        }}
        onChange={(i) => props.setId(matchings[i].id)}
      >
        {[
          ...Array.from(
            {
              length: waiting + 1,
            },
            (_, i) => i
          ),
        ].map((i) =>
          i == waiting ? (
            <TabPane tab={"새 매칭"} key={i}>
              <div className={styles.new_matching_container}>
                <div className={styles.new_matching_text}>원하는 조건이 없나요?</div>
                <Button
                  onClick={() => {
                    window.location.replace("/newmatching");
                  }}
                >
                  새로 등록하기
                </Button>
              </div>
            </TabPane>
          ) : (
            <TabPane tab={`매칭 ${i + 1}`} key={i} disabled={i === 28}>
              {/* <div className={styles.desc_container}> */}
              <Descriptions title="매칭 정보" bordered>
                <Descriptions.Item label="맛집">{name}</Descriptions.Item>
                <Descriptions.Item label="대기자 수">{waiting}</Descriptions.Item>
                <Descriptions.Item label="매칭 조건">
                  성별: {[...matchings[i].tags][0]} <br />
                  학과: {[...matchings[i].tags][1]} <br />
                  만남 모드: {[...matchings[i].tags][2]} <br />
                </Descriptions.Item>
                <Descriptions.Item label="최대 인원">{matchings[i].max}</Descriptions.Item>
                <Descriptions.Item label="시간">{matchings[i].date}</Descriptions.Item>
                <Descriptions.Item label="한줄 소개">{matchings[i].description}</Descriptions.Item>
              </Descriptions>
              {/* </div> */}
            </TabPane>
          )
        )}
      </Tabs>
    </div>
  );
}

export default DetailPage;