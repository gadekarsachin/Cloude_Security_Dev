import React from 'react';

const App = () => {
  const notificationsData = [
    {
      id: 1,
      title: 'Notification 1',
      description: 'This is the description for notification 1.',
    },
    {
      id: 2,
      title: 'Notification 2',
      description: 'This is the description for notification 2.',
    },
    {
      id: 3,
      title: 'Notification 3',
      description: 'This is the description for notification 3.',
    },
 
  ];

  const Notification = ({ title, description }) => {
    const handleViewClick = () => {
      // Handle view button click
      // Add your logic here
    };

    const handleRemoveClick = () => {
      // Handle remove button click
      // Add your logic here
    };

    return (
      <div className="notification card " style={{borderBottomColor:'gary' , borderBottomWidth:3}} >
        <div className="card-body">
        {/* <i class="fa-solid fa-bell mr-2 header-user-info font-size-lg"></i>  */}
        <i class="fa-sharp fa-solid fa-xmark float-right"></i>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          {/* <div className="notification-buttons">
            <button className="btn btn-primary" onClick={handleViewClick}>
              View
            </button>
            <button className="btn btn-danger ml-2" onClick={handleRemoveClick}>
              Remove
            </button>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div  style={{ height: '80vh', overflowY: 'scroll' }}>
      {notificationsData.map((notification) => (
        <Notification
          key={notification.id}
          title={notification.title}
          description={notification.description}
        />
      ))}
    </div>
  );
};

export default App;
