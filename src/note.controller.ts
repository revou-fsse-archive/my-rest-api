import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';

import { NoteInput } from './dto/note.dto';

export type Note = {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

@Controller('notes')
export class NoteController {
  notes: Note[];

  constructor() {
    this.notes = [
      {
        id: 1,
        title: 'This is a hectic day',
        body: 'We release the system with the new framework version. A lot of unexpected things happened',
        userId: 10,
        createdAt: new Date('2023-04-01T07:10:28.165Z'),
        updatedAt: new Date('2023-04-01T07:10:28.165Z'),
      },
      {
        id: 2,
        title: 'I met my old friend today',
        body: "I met Eric when I was having lunch in a cafe. He's completely changed.",
        userId: 11,
        createdAt: new Date('2023-04-01T10:15:01.122Z'),
        updatedAt: new Date('2023-04-01T10:15:01.122Z'),
      },
    ];
  }

  // GET /notes
  @Get()
  findAll() {
    return this.notes;
  }

  // GET /notes/:id
  @Get(':id')
  findOne(@Param('id') id: number) {
    const note = this.notes.find((note) => note.id == id);

    if (!note) {
      throw new NotFoundException(`Note with id: ${id} does not exist`);
    }

    return note;
  }

  // POST /notes
  @Post()
  create(@Body() input: NoteInput) {
    const lastId = this.notes[this.notes.length - 1].id;
    const now = new Date();

    const newNote = {
      id: lastId + 1,
      title: input.title,
      body: input.body,
      userId: input.userId,
      createdAt: now,
      updatedAt: now,
    };

    this.notes.push(newNote);

    return newNote;
  }

  // DELETE /notes/:id
  @Delete(':id')
  remove(@Param('id') id: number) {
    const index = this.notes.findIndex((note: Note) => note.id == id);

    if (index == -1) {
      throw new NotFoundException(`Note with id: ${id} does not exist`);
    }

    this.notes.splice(index, 1);

    return {
      message: `Note with id: ${id} has been succesfully deleted`,
    };
  }

  // PUT /notes/:id
  @Put(':id')
  update(@Param('id') id: number, @Body() input: NoteInput) {
    const index = this.notes.findIndex((note) => note.id == id);

    if (index == -1) {
      throw new NotFoundException(`Note with id: ${id} does not exist`);
    }

    const note = this.notes[index];

    this.notes[index] = {
      id: note.id,
      title: input.title,
      body: input.body,
      userId: input.userId,
      createdAt: note.createdAt,
      updatedAt: new Date(),
    };

    return this.notes[index];
  }

  // PATCH /notes/:id
  @Patch(':id')
  patch(@Param('id') id: number, @Body() input) {
    const index = this.notes.findIndex((note) => note.id == id);

    if (index == -1) {
      throw new NotFoundException(`Note with id: ${id} does not exist`);
    }

    const note = this.notes[index];

    this.notes[index] = {
      id: note.id,
      title: input.title || note.title,
      body: input.body || note.body,
      userId: input.userId || note.userId,
      createdAt: note.createdAt,
      updatedAt: new Date(),
    };

    return this.notes[index];
  }
}
