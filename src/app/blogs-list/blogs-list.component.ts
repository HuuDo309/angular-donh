import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blogs';
import { MappingService } from '../mapping.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogListComponent implements OnInit {
  @Input() blogs: Blog[] = [];
  constructor(
    private blogService: BlogService,
    public mappingService : MappingService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data; 
    });
  }

  onDelete(blogId: number): void {
    this.blogService.deleteBlog(blogId).subscribe(() => {
      this.blogs = this.blogs.filter(blog => blog.id !== blogId);
    });
  }
}
