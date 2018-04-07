import { Injectable } from '@angular/core';
//
import * as firebase from 'firebase';
import "firebase/firestore";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


/**
 *
 *
 * @example
 *
 /// how to add a review.
 const d = new Date();
 review.create({
                idxStudent: user.info.idx,
                studentName: user.info.name,
                idxTeacher: 200,
                teacherName: 'TeacherTwo',
                rate: 5,
                comment: 'Hi, TeacherTwo. This teacher is good.',
                date: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            });

 /// list review.
 review.gets( { idxTeacher: 27830, from: 5, to: 10 }, re => {
                console.log("gets re: ", re);

            });


 review.get('TWNirdxOp9twFiRphwqL', data => {
                console.log("get: re: ", data);
                data['comment'] = 'Comment is updated for this teacher ... !';
                review.edit( data, re => {
                    console.log("edit re :", re);

                    review.delete( 'TWNirdxOp9twFiRphwqL', re => {
                        console.log("delete: ", re);
                    });
                } );
            });



 */

@Injectable()
export class ReviewService {

store: firebase.firestore.Firestore;
constructor(
    private afs: AngularFirestore
) {
    this.store = <any>afs.firestore;
    // this.store.collection('review')
    // .orderBy('date', 'desc')
    // .limit(5)
    // .get().then(docs => {
    //     // console.log(shots.size);
    //     if ( docs.size ) {
    //         docs.forEach( doc => {
    //             if ( doc && doc.exists  ) {
    //                 console.log( doc.data() );
    //             }
    //         });
    //     }
    // });
}



  getTeacherLatestReview(req, callback) {
    let query;

    if ( !req['limit'] ) req['limit'] = 10;

    if (req['next']) {
      query = this.store.collection("review")
        .orderBy("time", "desc")
        .limit(req['limit'])
        .startAfter(req['next']);
    } else {
      query = this.store.collection("review")
        .orderBy("time", "desc")
        .limit(req['limit']);
    }

    query.get()
      .then((querySnapshot) => {
        const re = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          const data = doc.data();
          data['documentID'] = doc.id;
          re.push(data);
        });
        callback({data: re, next: querySnapshot.docs[querySnapshot.docs.length - 1]});
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        alert("후기 목록 읽기. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
      });
  }



    //
    // /**
    //  *
    //  *
    //  *
    //  review.create({
    //               idxStudent: user.info.idx,
    //               studentName: user.info.name,
    //               teacherName: 'TeacherWho',
    //               rate: 5,
    //               comment: 'This teacher is good.'
    //           });
    //
    //  */
    // create(data, callback) {
    //   data['time'] = (new Date).getTime();
    //   this.db.collection('review').add(data).then(re => {
    //     console.log("Review Created: ", re);
    //     callback(re.id);
    //   }).catch(error => {
    //     console.log("Error creating review: ", error);
    //     alert("Comment Create Failed");
    //   });
    // }
    //
    //
    // gets(req, callback) {
    //   let query;
    //
    //   if ( !req['limit'] ) req['limit'] = 10;
    //
    //   if (req['next']) {
    //     query = this.db.collection("review")
    //       .where("idxTeacher", "==", req['idxTeacher'])
    //       .orderBy("time", "desc")
    //       .limit(req['limit'])
    //       .startAfter(req['next']);
    //   } else {
    //     query = this.db.collection("review")
    //       .where("idxTeacher", "==", req['idxTeacher'])
    //       .orderBy("time", "desc")
    //       .limit(req['limit']);
    //   }
    //
    //   query.get()
    //     .then((querySnapshot) => {
    //       const re = [];
    //       querySnapshot.forEach(function (doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         const data = doc.data();
    //         data['documentID'] = doc.id;
    //         re.push(data);
    //       });
    //       callback({data: re, next: querySnapshot.docs[querySnapshot.docs.length - 1]});
    //     })
    //     .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //       alert("후기 목록 읽기. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //     });
    // }
    //
    // get(id, callback) {
    //   const docRef = this.db.collection("review").doc(id);
    //
    //   docRef.get().then(doc => {
    //     if (doc.exists) {
    //       // console.log("Document data:", doc.data());
    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       callback(data);
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //       alert("수업 후기가 존재하지 않습니다.");
    //     }
    //   }).catch((error) => {
    //     console.log("Error getting document:", error);
    //     alert("후기 읽기. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //   });
    // }
    //
    // edit(data, callback) {
    //   const id = data.id;
    //   delete data.id;
    //   data['time'] = (new Date).getTime();
    //   this.db.collection('review').doc(id).set(data)
    //     .then(re => callback(true))
    //     .catch(e => {
    //       console.error(e);
    //       alert("후기 수정. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //     });
    // }
    //
    // delete(id, callback) {
    //   this.db.collection('review').doc(id).delete()
    //     .then(re => callback(true))
    //     .catch(e => {
    //       console.error(e);
    //       alert("후기 삭제. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //     });
    // }
    //
    //
    // setTeacherRate(data, callback) {
    //   const idx = data.idx;
    //   delete data.idx;
    //   this.db.collection('review-rate').doc(idx).set(data)
    //     .then(re => callback(true))
    //     .catch(e => {
    //       console.error(e);
    //       alert("후기 수정. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //     });
    // }
    //
    // getTeacherRate(idx, callback) {
    //   const docRef = this.db.collection("review-rate").doc(idx);
    //
    //   docRef.get().then(doc => {
    //     if (doc.exists) {
    //       // console.log("Document data:", doc.data());
    //       const data = doc.data();
    //       data['idx'] = doc.id;
    //       callback(data);
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //       callback(null);
    //       // alert("수업 후기가 존재하지 않습니다.");
    //     }
    //   }).catch((error) => {
    //     console.log("Error getting document:", error);
    //     alert("후기 읽기. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //   });
    // }
    //
    //
    //
    // getTeachersRate(callback) {
    //   this.db.collection("review-rate")
    //     .get()
    //     .then((querySnapshot) => {
    //       const re = {};
    //       querySnapshot.forEach(function (doc) {
    //         re[doc.id] = doc.data();
    //       });
    //       callback(re);
    //     })
    //     .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //       alert("후기 목록 읽기. 데이터베이스 에러. 관리자에게 연락해주세요."); // Database error. Please inform this to admin immediately.
    //     });
    // }
    //
    //


}

