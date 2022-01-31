import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */
  private static ApiUrl : string = "https://raw.githubusercontent.com/NablaT/starter-quiz-two/master/mock-quiz.json";
   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);

  constructor(private http : HttpClient) {
    this.getQuizzes();
  }

  getQuizzes() {
    this.http.get<Quiz[]>(QuizService.ApiUrl).subscribe(obs => {
      this.quizzes = obs;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }

  deleteQuiz(quiz : Quiz) {
    this.quizzes = this.quizzes.filter(quiz_ => quiz_ !== quiz);
    this.quizzes$.next(this.quizzes);
  }
}
