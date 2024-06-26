import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { createCourseSchema, deleteCourseByIdSchema, getAllCoursesSchema, getCourseByIdSchema, updateCourseSchema } from './schema';
import { createCourseService, deleteCourseByIdService, findCourseByIdService, getAllCoursesService, updateCourseByIdService } from './course.service';
import { errorHandler, responseHandler } from '@libs/response';
import { StatusCodes } from '@libs/enum';

const getAllCoursesHandler: ValidatedEventAPIGatewayProxyEvent<typeof getAllCoursesSchema> = async (event) => {
  try {
    const courses = await getAllCoursesService(
      event.body as {
        skip: number;
        take: number;
        searchKeyword?: string;
        sortColumn?: string;
      });

    return responseHandler(StatusCodes.Success, courses);
  } catch (error) {
    if (error instanceof Error) {
      return errorHandler(error);
    }
    throw error;
  }
};

const findCourseByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof getCourseByIdSchema> = async (event) => {
  try {
    const course = await findCourseByIdService(event.body);

    return responseHandler(StatusCodes.Success, course);
  } catch (error) {
    if (error instanceof Error) {
      return errorHandler(error);
    }
    throw error;
  }
};

const createCourseHandler: ValidatedEventAPIGatewayProxyEvent<typeof createCourseSchema> = async (event) => {
  try {
    const course = await createCourseService(event.body);

    return responseHandler(StatusCodes.Success, course);
  } catch (error) {
    if (error instanceof Error) {
      return errorHandler(error);
    }
    throw error;
  }
};

const deleteCourseByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof deleteCourseByIdSchema> = async (event) => {
  try {
    const course = await deleteCourseByIdService(event.body);

    return responseHandler(StatusCodes.Success, { course });
  } catch (error) {
    if (error instanceof Error) {
      return errorHandler(error);
    }
    throw error;
  }
};

const updateCourseByIdHandler: ValidatedEventAPIGatewayProxyEvent<typeof updateCourseSchema> = async (event) => {
  try {
    const course = await updateCourseByIdService(event.body);

    return responseHandler(StatusCodes.Success, { course });
  } catch (error) {
    if (error instanceof Error) {
      return errorHandler(error);
    }
    throw error;
  }
};

export const getAllCourses = middyfy(getAllCoursesHandler);
export const findCourseById = middyfy(findCourseByIdHandler);
export const createCourse = middyfy(createCourseHandler);
export const deleteCourseById = middyfy(deleteCourseByIdHandler);
export const updateCourseById = middyfy(updateCourseByIdHandler);