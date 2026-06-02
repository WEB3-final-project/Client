"use client";

import Link from "next/link";

import { isLive } from "@/utils/live";
import React from "react";
import FavoriteButton from "./favoriteButton";
import { useState, useEffect } from "react";
import DeleteRoomButton from "@/components/private/rooms/deleteButton";
import Cookies from "js-cookie";
export default function PlanningGrid({
  sessions: initialSessions,
}) {
    const [sessions, setSessions] =
    useState(initialSessions);
    const [role, setRole] =
    useState(null);

  useEffect(() => {
    setRole(
      Cookies.get("role")
    );
  }, []);
  const rooms = [
    ...new Map(
      sessions.map((s) => [
        s.room.id,
        s.room,
      ])
    ).values(),
  ];

  function handleRoomDeleted(
    deletedRoomId
  ) {

    setSessions((prev) =>
      prev.filter(
        (session) =>
          session.room.id !==
          deletedRoomId
      )
    );
  }


  
  const timeSlots = [
    ...new Set(
      sessions.map((session) => {
        return new Date(
          session.start_time
        ).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
      })
    ),
  ].sort();

  return (
    <div className="overflow-x-auto">
      <div
        className="
          min-w-[1200px]
          grid
          border
        "
        style={{
          gridTemplateColumns: `140px repeat(${rooms.length}, minmax(300px, 1fr))`,
        }}
      >

        <div
          className="
            border
            p-4
            font-bold
            bg-gray-100
          "
        >
          Time
        </div>

        {rooms.map((room) => (
          <div
            key={room.id}
            className="
              border
              p-4
              font-bold
              bg-gray-100
            "
          >
            {room.name}
            {role === "admin" && (
                <div className="flex gap-2">
            <Link
              href={`/private/admin/rooms/${room.id}/edit/`}
              className="
                bg-blue-500
                text-white
                px-3
                py-1
                rounded
                text-sm
              "
            >
              Modifier
            </Link>

            <DeleteRoomButton
              roomId={room.id}
              onDeleteSuccess={
                handleRoomDeleted
              }
            />
          </div>
            )
            }
          </div>
        ))}


        {timeSlots.map(
          (time) => (
             <React.Fragment key={time}>

              <div
                className="
                  border
                  p-4
                  font-semibold
                  bg-gray-50
                "
              >
                {time}
              </div>


              {rooms.map(
                (room) => {
                  const roomSessions =
                    sessions.filter(
                      (
                        session
                      ) => {
                        const start =
                          new Date(
                            session.start_time
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute:
                                "2-digit",
                            }
                          );

                        return (
                          start ===
                            time &&
                          session
                            .room
                            .id ===
                            room.id
                        );
                      }
                    );

                  return (
                    <div
                      key={`${room.id}-${time}`}
                      className="
                        border
                        p-2
                        min-h-[220px]
                        space-y-3
                      "
                    >
                      {roomSessions.map(
                        (
                          session
                        ) => {
                          const live =
                            isLive(
                              session.start_time,
                              session.end_time
                            );

                          return (
                            <Link
                              href={`/sessions/${session.id}`}
                              key={
                                session.id
                              }
                              className="
                                block
                                border
                                rounded-xl
                                p-4
                                bg-white
                                hover:shadow-md
                                transition
                              "
                            >
                              <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">
                                  {
                                    session.title
                                  }
                                </h3>

                                {live && (
                                  <span
                                    className="
                                      bg-red-500
                                      text-white
                                      text-xs
                                      px-2
                                      py-1
                                      rounded
                                    "
                                  >
                                    LIVE
                                  </span>
                                )}
                              </div>

                              <div className="mt-3 text-sm text-gray-600">
                                {new Date(
                                  session.start_time
                                ).toLocaleTimeString(
                                  [],
                                  {
                                    hour:
                                      "2-digit",
                                    minute:
                                      "2-digit",
                                  }
                                )}
                                {" - "}
                                {new Date(
                                  session.end_time
                                ).toLocaleTimeString(
                                  [],
                                  {
                                    hour:
                                      "2-digit",
                                    minute:
                                      "2-digit",
                                  }
                                )}
                              </div>

                              <div className="mt-2 text-sm">
                                Room :
                                {" "}
                                {
                                  session
                                    .room
                                    .name
                                }
                              </div>

                              <div className="mt-3">
                                <p className="text-sm font-semibold">
                                  Speakers
                                </p>

                                <div className="text-sm text-gray-600">
                                  {session.speakers
                                    ?.map(
                                      (
                                        s
                                      ) =>
                                        s
                                          .speaker
                                          .full_name
                                    )
                                    .join(
                                      ", "
                                    )}
                                </div>
                              </div>

                              <div className="mt-4">
                                <FavoriteButton
                                  session={
                                    session
                                  }
                                />
                              </div>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}