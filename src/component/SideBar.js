import React, {Component} from 'react'

export default class SideBar extends Component{
  render () {
    const { rooms, logout,  user, activeRoom, setActiveRoom} = this.props
    return (
      <div id = "sideBar">
          <div className = "heading">
            <div> IOT CHAT </div>
          </div>
          <div
						className="users"
						ref='users'
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveRoom(null) }}>

						{
						rooms.map((room)=>{
							if(room.name){
								const lastMessage = room.messages[room.messages.length - 1];

								const user = room.users.find(({name})=>{
									return name !== this.props.name
								}) || { name:"Community" }
								const classNames = (activeRoom && activeRoom.id === room.id) ? 'active' : ''

								return(
								<div
									key={room.id}
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveRoom(room) } }
									>
									<div className="user-photo">{user.name[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{user.name}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>

								</div>
							)
							}

							return null
						})
						}

					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<button onClick={()=>{logout()}} title="Logout" className="logout"> Log out
						</button>
					</div>
			</div>
		);

	}
}
