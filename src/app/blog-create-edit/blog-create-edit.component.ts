import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../models/blogs';

@Component({
  selector: 'app-blog-create-edit',
  templateUrl: './blog-create-edit.component.html',
  styleUrls: ['./blog-create-edit.component.css']
})
export class BlogCreateEditComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode: boolean = false; 
  blogId: number | null = null;  

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      des: ['', Validators.required],
      detail: ['', Validators.required],
      category: ['', Validators.required],
      position: [[], Validators.required],
      public: [false],
      data_pubblic: [null, Validators.required],
      thumbs: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];  
      if (this.blogId) {
        this.isEditMode = true;  
        this.loadBlogData(this.blogId);  
      }
    });
  }

  loadBlogData(id: number): void {
    this.blogService.getBlogFromId(id).subscribe(blog => {
      this.blogForm.patchValue(blog);
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.isEditMode) {
        this.blogService.editBlog(this.blogForm.value).subscribe(response => {
          console.log('Blog updated:', response);
          this.router.navigate(['/blogs']); 
        });
      } else {
        this.blogService.addBlog(this.blogForm.value).subscribe(response => {
          console.log('Blog created:', response);
          this.router.navigate(['/blogs']);
        });
      }
    } else {
      console.log('Form is not valid!');
    }
  }

  onClear(): void {
    this.blogForm.reset();
  }
}
