import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketsProvider {

/**
    * @name _SERVER
    * @type object
    * @private
    * @description              The URI where the Socket.io server is running
    */
   private _SERVER: string 	=	'REMOTE-ADDRESS-OF-NODE-SERVER';
  pollServer: any;

  constructor(public http: HttpClient,
              private _SOCKET: Socket) { }
  
   /**
    * @public
    * @method addMessage
    * @description    					Adds a message to the socket.io session
    * @return {none}
    */
   addMessage(message : string) : void
   {
      // Use the emit method of the Socket.io library to broadcast a custom event
      // ('add-message') to the service - this will then add the supplied data to
      // the current session message stream
      this._SOCKET.emit('add-message', { message: message });
   }

   /**
    * @public
    * @method addImage
    * @description    					Adds an image to the socket.io session
    * @return {none}
    */
   addImage(image : string) : void
   {
      // Use the emit method of the Socket.io library to broadcast a custom event
      // ('add-image') to the service - this will then add the supplied data to
      // the current session message stream
      this._SOCKET.emit('add-image', { image: image });
   }








  // constructor(public http: HttpClient) {
  //   console.log('Hello SocketsProvider Provider');
  // }



}
