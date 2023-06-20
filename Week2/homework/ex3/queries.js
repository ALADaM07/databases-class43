module.exports = [
  {
    question: 'Retrieve authors and their mentors',
    query: `SELECT
                    a.author_name AS author,
                    m.author_name AS mentor
                  FROM
                    authors a
                  JOIN
                    authors m ON a.mentor_id = m.author_id;`,
  },
  {
    question: 'Retrieve authors and their published paper titles',
    query: `SELECT
                    a.*,
                    p.paper_title
                  FROM
                    authors a
                  LEFT JOIN
                    research_papers p ON a.author_id = p.author_id;`,
  },
];
