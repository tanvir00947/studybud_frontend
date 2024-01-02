import React from 'react';

const JustTopicName = ({ topicId, topics }) => {
  if (!topicId || !topics) {
    // You can choose to render a loading indicator or a message here
    return <div>Loading...</div>;
  }

  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <>
      {topic.name}
    </>
  );
};

export default JustTopicName;
