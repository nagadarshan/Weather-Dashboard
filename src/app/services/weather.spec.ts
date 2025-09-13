
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Weather } from './weather';

describe('Weather', () => {
  let service: Weather;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Weather]
    });
    service = TestBed.inject(Weather);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data from API', () => {
    const dummyWeather = { temp: 25, condition: 'Sunny' };
    const apiUrl = 'https://api.example.com/weather';

    service.getWeather(apiUrl).subscribe(data => {
      expect(data).toEqual(dummyWeather);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyWeather);
  });
});
