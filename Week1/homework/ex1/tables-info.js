module.exports = [
  {
    tableName: 'Invite',
    data: [
      {
        invite_no: 1,
        invite_name: 'John Doe',
        invited_by: 'Jane Smith',
      },
      {
        invite_no: 2,
        invite_name: 'Emily Johnson',
        invited_by: 'Michael Anderson',
      },
      {
        invite_no: 3,
        invite_name: 'Sarah Williams',
        invited_by: 'David Brown',
      },
      {
        invite_no: 4,
        invite_name: 'Robert Wilson',
        invited_by: 'Jennifer Davis',
      },
      {
        invite_no: 5,
        invite_name: 'Linda Taylor',
        invited_by: 'Thomas Martinez',
      },
    ],
  },
  {
    tableName: 'Room',
    data: [
      {
        room_no: 101,
        room_name: 'Conference Room A',
        floor_number: 1,
      },
      {
        room_no: 102,
        room_name: 'Conference Room B',
        floor_number: 1,
      },
      {
        room_no: 103,
        room_name: 'Meeting Room 1',
        floor_number: 2,
      },
      {
        room_no: 104,
        room_name: 'Meeting Room 2',
        floor_number: 2,
      },
      {
        room_no: 105,
        room_name: 'Board Room',
        floor_number: 3,
      },
    ],
  },
  {
    tableName: 'Meeting',
    data: [
      {
        meeting_no: 1,
        meeting_title: 'Project Kickoff',
        starting_time: '2023-06-15 10:00:00',
        ending_time: '2023-06-15 12:00:00',
        room_no: 101,
      },
      {
        meeting_no: 2,
        meeting_title: 'Marketing Strategy',
        starting_time: '2023-06-16 14:00:00',
        ending_time: '2023-06-16 16:00:00',
        room_no: 103,
      },
      {
        meeting_no: 3,
        meeting_title: 'Product Development',
        starting_time: '2023-06-17 09:30:00',
        ending_time: '2023-06-17 11:30:00',
        room_no: 102,
      },
      {
        meeting_no: 4,
        meeting_title: 'Budget Planning',
        starting_time: '2023-06-18 13:00:00',
        ending_time: '2023-06-18 15:00:00',
        room_no: 105,
      },
      {
        meeting_no: 5,
        meeting_title: 'Team Building',
        starting_time: '2023-06-19 11:00:00',
        ending_time: '2023-06-19 13:00:00',
        room_no: 104,
      },
    ],
  },
];
