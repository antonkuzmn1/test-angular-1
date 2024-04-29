import { TestBed } from '@angular/core/testing';

import { TransportScheduleService } from './transport-schedule.service';

describe('TransportScheduleService', () => {
  let service: TransportScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
