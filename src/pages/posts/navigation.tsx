import React, { Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, Button, Image, Container, Group, Divider } from "@mantine/core";
import { UserButton } from "../components/userButton";
import { useRouter } from "next/router";
import {
  IconLogout,
  IconUser,
  IconCirclePlus,
  IconExternalLink,
  IconBrandTelegram,
} from "@tabler/icons";
import { NextPage } from "next";
import { trpc } from ".././../utils/trpc";

const navigation = [
  { name: "首页", href: "/", current: true },
  { name: "动态", href: "#", current: false },
  { name: "直播", href: "#", current: false },
  { name: "学习看板", href: "#", current: false },
];

export const Navigation = ({ user }: any) => {
  const router = useRouter();

  return (
    <>
      <Container size="xl">
        <Group position="apart">
          <Group position="left">
            <Image
              src="https://raw.githubusercontent.com/weifengkkk/cubilose/dev-blog/public/cubilose.png"
              alt="团队logo"
              width={60}
            ></Image>
            {navigation.map((item) => (
              <Button
                variant="subtle"
                key={item.name}
                onClick={() => {
                  router.push(item.href);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Group>
          <Group position="right" spacing="xs">
            <Container sx={{ margin: 0 }}>
              <Menu
                width={200}
                shadow="md"
                transition="rotate-right"
                transitionDuration={150}
              >
                <Menu.Target>
                  <Button leftIcon={<IconCirclePlus />}>创作者空间</Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconBrandTelegram size={14} />}
                    component="a"
                    onClick={() => {
                      router.push("/posts/blogEditor");
                    }}
                  >
                    发表博客
                  </Menu.Item>

                  <Menu.Item
                    icon={<IconExternalLink size={14} />}
                    component="a"
                    href="https://mantine.dev"
                    target="_blank"
                  >
                    分享动态
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Container>

            <Container px={0} sx={{ margin: 0 }}>
              <Menu
                withArrow
                transition="rotate-right"
                transitionDuration={150}
              >
                <Menu.Target>
                  <UserButton
                    image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name={user.username || ""}
                    email={user.email || ""}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconUser size={14} />}
                    component="a"
                    href="https://mantine.dev"
                  >
                    个人中心
                  </Menu.Item>

                  <Menu.Item
                    icon={<IconLogout size={14} />}
                    onClick={async () => {
                      await signOut();
                      signIn();
                    }}
                  >
                    账号登出
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Container>
          </Group>
        </Group>
      </Container>
      <Divider></Divider>
    </>
  );
};
export default Navigation;
