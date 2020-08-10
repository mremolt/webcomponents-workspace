import { TemplateResult } from 'lit-element';
import { directive, DirectiveFn, NodePart } from 'lit-html';
import { Observable } from 'rxjs';

export const resolveObservable = directive(
  <T>(
    obs: Observable<T>,
    callback: (value: T) => DirectiveFn | TemplateResult
  ) => (part: NodePart) => {
    part.setValue('');

    obs.subscribe((value) => {
      const template = callback(value);
      part.setValue(template);
      part.commit();
    });
  }
);
