import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/interfaces';

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
