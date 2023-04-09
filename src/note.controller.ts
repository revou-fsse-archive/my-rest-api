import { Controller, Get, Post, Put, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { NoteInput } from './dto/note.dto'

@Controller('notes')
export class NoteController {
  constructor() {
    if (!global.notes) {
      this.initNotesValue();
    }
  }

  @Get()
  getAllNotes(): Array<Object> {
    return global.notes;
  }

  // route parameter id
  // path: /note/:id
  @Get(':id')
  getNote(@Param() params): Object {
    let note = global.notes.find((n) => n.id == params.id);

    if (!note) {
      throw new NotFoundException();
    }

    return note;
  }

  @Post()
  createNote(@Body() input: NoteInput): Object {
    let lastId = global.notes[global.notes.length - 1]['id'];
    let currentTs = this.currentTimeInSecond()

    let newNote = {
      id: lastId + 1,
      title: input.title,
      body: input.body,
      userId: input.userId,
      createdAt: currentTs,
      updatedAt: currentTs
    };

    global.notes.push(newNote)

    return newNote;
  }

  @Delete(':id')
  DeleteNote(@Param() params): Object {
    let index = global.notes.findIndex(note => note.id == params.id);

    if (index == -1) {
      throw new NotFoundException();
    }

    global.notes.splice(index, 1);
    return {
      message: `Note with id ${params.id} has been succesfully deleted`
    };
  }

  @Put(':id')
  PutNote(@Param() params, @Body() input: NoteInput): Object {
    let index = global.notes.findIndex(note => note.id == params.id);

    if (index == -1) {
      throw new NotFoundException();
    }

    let note = global.notes[index];

    global.notes[index] = {
      id: note.id,
      title: input.title,
      body: input.body,
      userId: input.userId,
      createdAt: note.createdAt,
      updatedAt: this.currentTimeInSecond()
    };

    return global.notes[index];
  }

  @Patch(':id')
  PatchNote(@Param() params, @Body() input: NoteInput): Object {
    let index = global.notes.findIndex(note => note.id == params.id);

    if (index == -1) {
      throw new NotFoundException();
    }

    let note = global.notes[index];

    global.notes[index] = {
      id: note.id,
      title: input.title || note.title,
      body: input.body || note.body,
      userId: input.userId || note.userId,
      createdAt: note.createdAt,
      updatedAt: this.currentTimeInSecond()
    };


    return global.notes[index];
  }

  initNotesValue() {
    global.notes = [
      {
        id: 1,
        title: 'This is a hectic day',
        body: 'We release the system with the new framework version. A lot of unexpected things happened',
        userId: 10,
        createdAt: 1678261472,
        updatedAt: 1678261472
      },
      {
        id: 2,
        title: 'I met my old friend today',
        body: 'I met Eric when I was having lunch in a cafe. He\'s completely changed.',
        userId: 11,
        createdAt: 1678281466,
        updatedAt: 1678281466
      }
    ];
  }

  currentTimeInSecond() {
    return Math.floor(Date.now() / 1000)
  }
}
